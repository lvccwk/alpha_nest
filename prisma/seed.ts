import { PrismaClient } from '@prisma/client';
import { User } from 'src/users/entities/user.entity';
const prisma = new PrismaClient();
async function main() {
	const fixedSubject = await prisma.subjects.createMany({
		data: [
			{
				name: 'Chinese',
				chinese_name: '中文'
			},
			{
				name: 'English',
				chinese_name: '英文'
			},
			{
				name: 'Mathematics',
				chinese_name: '數學'
			},
			{
				name: 'Economics',
				chinese_name: '經濟'
			},
			{
				name: 'Liberal Studies',
				chinese_name: '通識'
			},
			{
				name: 'Biology',
				chinese_name: '生物'
			},
			{
				name: 'Chemistry',
				chinese_name: '化學'
			},
			{
				name: 'Physics',
				chinese_name: '物理'
			},
			{
				name: 'Geography',
				chinese_name: '地理'
			},
			{
				name: 'History',
				chinese_name: '世界歷史'
			},
			{
				name: 'Chinese History',
				chinese_name: '中國歷史'
			}
		]
	});

	const arfarteacher1 = await prisma.users.upsert({
		where: { email: 'arfar@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: 'arfar',
			email: 'arfar@gmail.com',
			password: 'adminadmin',

			teacher: {
				create: {
					info: 'Ar Far, Ar Far為ArFar Learning中文補習導師，為理大中國語言文學碩士。熱衷於中文及教育的他，每年均會親征DSE考場並捧星而回，中文知識及考試技巧深厚，絕對無庸置疑。其輕鬆幽默的教學風格，以及課堂後的答問環節，深得學生歡心，更成功令學生於校內考試由中下游成績躍升至全級第四，寫作卷更考獲全級第一名佳績。 ',
					rating: 10
				}
			},
			product: {
				create: {
					name: '中文精讀班',
					price: 38,
					product_type: 'course',
					avg_rating: 10,
					file_url: 'http://download.pdf',
					image: 'hihi.jpg',
					teacher_id: 1
				}
			},
			timetable: {
				create: {
					time_slot: '2023-03-18 16:00:00'
				}
			},
			chatroom: {
				create: {
					name: '牙遠補習房'
				}
			},
			chatroom_history: {
				create: {
					content: '中大第一'
				}
			}
		}
	});
	const arfarstudent = await prisma.users.upsert({
		where: { email: 'arfarstudent@gmail.com' },
		update: {},
		create: {
			user_type: 'student',
			username: 'arfarstudent',
			email: 'arfarstudent@gmail.com',
			password: 'adminadmin',

			followed_teachers: {
				create: {
					teacher_id: 1
				}
			},
			cart: {
				create: {
					cart_detail: {
						create: {
							product_id: 1
						}
					}
				}
			},
			product_rating: {
				create: {
					rating: 10
				}
			},
			purchase_history: {
				create: {
					product_id: 1
				}
			},
			chatroom: {
				create: {
					name: '牙遠補習房'
				}
			},
			chatroom_history: {
				create: {
					content: '中大第一'
				}
			},
			chatroom_participant: {
				create: {
					chatroom_id: 1
				}
			}
		}
	});

	const arfarteacher2 = await prisma.users.upsert({
		where: { email: 'arfar1@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: '牙花',
			email: 'arfar1@gmail.com',
			password: 'adminadmin',
			followed_teachers: {
				create: {
					teacher_id: 1
				}
			},
			teacher: {
				create: {
					info: '牙花英文知識及考試技巧深厚，絕對無庸置疑。其輕鬆幽默的教學風格，以及課堂後的答問環節，深得學生歡心，更成功令學生於校內考試由中下游成績躍升至全級第四，寫作卷更考獲全級第一名佳績。 ',
					rating: 10
				}
			},
			product: {
				create: {
					name: '英文精讀班',
					price: 58,
					product_type: 'course',
					avg_rating: 8,
					file_url: 'http://download.pdf',
					image: 'hihi.jpg',
					teacher_id: 2
				}
			},
			timetable: {
				create: {
					time_slot: '2023-03-18 16:00:00'
				}
			},
			chatroom: {
				create: {
					name: '牙花補習房'
				}
			},
			chatroom_history: {
				create: {
					content: '不用讀書'
				}
			}
		}
	});

	const arfarteacher3 = await prisma.users.upsert({
		where: { email: 'arfar2@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: '牙花老師',
			email: 'arfar2@gmail.com',
			password: 'adminadmin',
			followed_teachers: {
				createMany: {
					data: [
						{
							teacher_id: 1
						},
						{
							teacher_id: 2
						}
					]
				}
			},
			teacher: {
				create: {
					info: '牙花英文知識及考試技巧深厚，絕對無庸置疑。其輕鬆幽默的教學風格，以及課堂後的答問環節，深得學生歡心，更成功令學生於校內考試由中下游成績躍升至全級第四，寫作卷更考獲全級第一名佳績。 ',
					rating: 10
				}
			},
			product: {
				create: {
					name: '數學精讀班',
					price: 38,
					product_type: 'course',
					avg_rating: 10,
					file_url: 'http://download.pdf',
					image: 'hihi.jpg',
					teacher_id: 3
				}
			},
			timetable: {
				create: {
					time_slot: '2023-03-18 16:00:00'
				}
			},
			chatroom: {
				create: {
					name: '牙花補習房'
				}
			},
			chatroom_history: {
				create: {
					content: '不用讀書'
				}
			}
		}
	});
	console.log({ arfarstudent, arfarteacher1, arfarteacher2, arfarteacher3 });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
