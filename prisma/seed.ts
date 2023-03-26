import { PrismaClient } from '@prisma/client';
import { User } from 'src/users/entities/user.entity';
const prisma = new PrismaClient();
async function main() {
	const arfar = await prisma.users.upsert({
		where: { email: 'arfar@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: 'arfar',
			email: 'arfar@gmail.com',
			password: 'adminadmin',
			image: 'admin.png',
			subject: {
				create: {
					name: 'chinese',
					chinese_name: '中文'
				}
			},
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
					file_url: 'http://download.pdf'
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
			image: 'admin.png',
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

	const teacher2 = await prisma.users.upsert({
		where: { email: 'teacher2@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: 'teacher2',
			email: 'teacher2@gmail.com',
			password: 'adminadmin',
			image: 'admin.png',
			subject: {
				create: {
					name: 'english',
					chinese_name: '英文'
				}
			},
			teacher: {
				create: {
					info: 'Teacher2 為ArFar Learning英文補習導師，為理大中國語言文學碩士。熱衷於中文及教育的他，每年均會親征DSE考場並捧星而回，中文知識及考試技巧深厚，絕對無庸置疑。其輕鬆幽默的教學風格，以及課堂後的答問環節，深得學生歡心，更成功令學生於校內考試由中下游成績躍升至全級第四，寫作卷更考獲全級第一名佳績。 ',
					rating: 10
				}
			},
			product: {
				create: {
					name: '中文精讀班',
					price: 38,
					product_type: 'course',
					avg_rating: 10,
					file_url: 'http://download.pdf'
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

	const teacher3 = await prisma.users.upsert({
		where: { email: 'teacher3@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: 'teacher3',
			email: 'teacher3@gmail.com',
			password: 'adminadmin',
			image: 'admin.png',
			subject: {
				create: {
					name: 'econ',
					chinese_name: '經濟'
				}
			},
			teacher: {
				create: {
					info: 'Teacher2 為ArFar Learning經濟補習導師，為理大中國語言文學碩士。熱衷於中文及教育的他，每年均會親征DSE考場並捧星而回，中文知識及考試技巧深厚，絕對無庸置疑。其輕鬆幽默的教學風格，以及課堂後的答問環節，深得學生歡心，更成功令學生於校內考試由中下游成績躍升至全級第四，寫作卷更考獲全級第一名佳績。 ',
					rating: 10
				}
			},
			product: {
				create: {
					name: '中文精讀班',
					price: 38,
					product_type: 'course',
					avg_rating: 10,
					file_url: 'http://download.pdf'
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

	const teacher4 = await prisma.users.upsert({
		where: { email: 'teacher4@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: 'teacher4',
			email: 'teacher4@gmail.com',
			password: 'adminadmin',
			image: 'admin.png',
			subject: {
				create: {
					name: 'engligh',
					chinese_name: '英文'
				}
			},
			teacher: {
				create: {
					info: 'Teacher2 為ArFar Learning英文補習導師，為理大中國語言文學碩士。熱衷於中文及教育的他，每年均會親征DSE考場並捧星而回，中文知識及考試技巧深厚，絕對無庸置疑。其輕鬆幽默的教學風格，以及課堂後的答問環節，深得學生歡心，更成功令學生於校內考試由中下游成績躍升至全級第四，寫作卷更考獲全級第一名佳績。 ',
					rating: 10
				}
			},
			product: {
				create: {
					name: '中文精讀班',
					price: 38,
					product_type: 'course',
					avg_rating: 10,
					file_url: 'http://download.pdf'
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
	console.log({ arfar, arfarstudent, teacher2, teacher3, teacher4 });
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
