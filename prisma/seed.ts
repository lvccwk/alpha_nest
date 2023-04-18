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

	const arfarteacher2 = await prisma.users.upsert({
		where: { email: 'arfar1@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: '牙花',
			email: 'arfar1@gmail.com',
			password: 'adminadmin',
			image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/001-002.png',
			teacher: {
				create: {
					info: '中大中大中大中大中大中大中大中大中大',
					school: '中大',
					experience: 1,
					product: {
						create: [
							{
								name: '中文精讀班',
								price: 20,
								product_type: 'course',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/%E6%88%AA%E5%9C%96+2023-04-06+19.22.05.png',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/001-002.png',
								subject_id: 1,
								info: '中大大爆炸'
							},
							{
								name: '中文精讀筆記',
								price: 30,
								product_type: 'note',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/%E6%88%AA%E5%9C%96+2023-04-06+19.22.05.png',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/001-002.png',
								subject_id: 1,
								info: '中大大爆炸'
							}
						]
					}
				}
			}
		}
	});

	const arfarstudent1 = await prisma.users.upsert({
		where: { email: 'arfar2@gmail.com' },
		update: {},
		create: {
			user_type: 'student',
			username: '牙花花',
			email: 'arfar2@gmail.com',
			password: 'adminadmin',
			image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/001-002.png',
			purchase_history: {
				create: {
					product_id: 1
				}
			}
		}
	});

	console.log(fixedSubject, arfarteacher2);
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
