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
		where: { email: 'arfar1@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: 'Jisoo',
			email: 'arfar1@gmail.com',
			password: 'adminadmin',
			image: 'https://frdproject.s3.ap-southeast-1.amazonaws.com/Jisoo-Solo-BlackPink-1.webp',
			cart: {
				create: {}
			},
			teacher: {
				create: {
					info: '畢業於港大風險管理學系，擁多年教學經驗，親奪CE、AL、DSE數學多份卷A及5**佳績，擅長分析題型CP值、DSE出題趨勢，擅於教授實戰技巧，希望令學生以最短的準備時間，考獲最高成績。',
					school: '香港大學',
					experience: 7,
					product: {
						create: [
							{
								name: '中文精讀班',
								price: 20,
								product_type: 'course',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/Crowell+and+Slesnick+Calculus.pdf',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/note.jpg',
								subject_id: 1,
								info: 'DSE中文卷一和卷二通常被同學視為死敵，其實只要對症下藥，取得5級並不是難事。考評局資料顯示，2021DSE同學只要獲得58%分數便有4級，而65%分數更能考獲5級成績！ '
							},
							{
								name: '中文精讀筆記',
								price: 30,
								product_type: 'note',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/Crowell+and+Slesnick+Calculus.pdf',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/note.jpg',
								subject_id: 1,
								info: 'DSE中文卷一和卷二通常被同學視為死敵，其實只要對症下藥，取得5級並不是難事。考評局資料顯示，2021DSE同學只要獲得58%分數便有4級，而65%分數更能考獲5級成績！ '
							}
						]
					}
				}
			}
		}
	});

	const arfarteacher2 = await prisma.users.upsert({
		where: { email: 'arfar2@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: 'Lisa',
			email: 'arfar2@gmail.com',
			password: 'adminadmin',
			image: 'https://frdproject.s3.ap-southeast-1.amazonaws.com/lisa-blackpink.webp',
			cart: {
				create: {}
			},
			teacher: {
				create: {
					info: '畢業於香港科技大學市場及管理系，曾於DSE英文考獲5*佳績並擁有5年的教學經驗，清楚了解不同程度的學生會面對的英文難題。',
					school: '香港大學',
					experience: 3,
					product: {
						create: [
							{
								name: '英文精讀班',
								price: 20,
								product_type: 'course',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/Crowell+and+Slesnick+Calculus.pdf',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/note.jpg',
								subject_id: 2,
								info: '中大大爆炸'
							},
							{
								name: '英文精讀筆記',
								price: 30,
								product_type: 'note',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/Crowell+and+Slesnick+Calculus.pdf',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/note.jpg',
								subject_id: 2,
								info: '中大大爆炸'
							}
						]
					}
				}
			}
		}
	});

	const arfarteacher3 = await prisma.users.upsert({
		where: { email: 'arfar3@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: 'Jennie',
			email: 'arfar3@gmail.com',
			password: 'adminadmin',
			image: 'https://frdproject.s3.ap-southeast-1.amazonaws.com/collage-1614141135.jpg',
			cart: {
				create: {}
			},
			teacher: {
				create: {
					info: '畢業於香港科技大學市場及管理系，曾於DSE英文考獲5*佳績並擁有5年的教學經驗，清楚了解不同程度的學生會面對的英文難題。',
					school: '香港大學',
					experience: 2,
					product: {
						create: [
							{
								name: '數學精讀班',
								price: 20,
								product_type: 'course',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/Crowell+and+Slesnick+Calculus.pdf',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/note.jpg',
								subject_id: 3,
								info: '中大大爆炸'
							},
							{
								name: '數學精讀筆記',
								price: 30,
								product_type: 'note',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/Crowell+and+Slesnick+Calculus.pdf',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/note.jpg',
								subject_id: 3,
								info: '中大大爆炸'
							}
						]
					}
				}
			}
		}
	});

	const arfarteacher4 = await prisma.users.upsert({
		where: { email: 'arfar4@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: 'Rose',
			email: 'arfar4@gmail.com',
			password: 'adminadmin',
			image: 'https://frdproject.s3.ap-southeast-1.amazonaws.com/GettyImages-1027688840-e1679602025642.webp',
			cart: {
				create: {}
			},
			teacher: {
				create: {
					info: '畢業於香港科技大學市場及管理系，曾於DSE英文考獲5*佳績並擁有5年的教學經驗，清楚了解不同程度的學生會面對的英文難題。',
					school: '香港大學',
					experience: 3,
					product: {
						create: [
							{
								name: '通識精讀班',
								price: 20,
								product_type: 'course',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/Crowell+and+Slesnick+Calculus.pdf',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/note.jpg',
								subject_id: 4,
								info: '中大大爆炸'
							},
							{
								name: '通識精讀筆記',
								price: 30,
								product_type: 'note',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/Crowell+and+Slesnick+Calculus.pdf',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/note.jpg',
								subject_id: 4,
								info: '中大大爆炸'
							}
						]
					}
				}
			}
		}
	});

	const arfarteacher6 = await prisma.users.upsert({
		where: { email: 'arfar6@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: 'James',
			email: 'arfar6@gmail.com',
			password: 'adminadmin',
			image: 'https://lh4.googleusercontent.com/uPXNiqYJ1miaretuCH69s_BTDg6doAAXjFxLS-0ABjheMoSoPM8jD-LPaFswJvmVgqvWlucSkqfibRip7WPBZrp70DlEhDxtIk9srOgBfj-jbXvYgMRvIXm2iO8mFZnrDbm6ItrKdtsZxbFL84qt89PomQ=s2048',
			cart: {
				create: {}
			},
			teacher: {
				create: {
					info: '畢業於香港科技大學市場及管理系，曾於DSE英文考獲5*佳績並擁有5年的教學經驗，清楚了解不同程度的學生會面對的英文難題。',
					school: '香港大學',
					experience: 10,
					product: {
						create: [
							{
								name: '中文精讀班',
								price: 20,
								product_type: 'course',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/Crowell+and+Slesnick+Calculus.pdf',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/note.jpg',
								subject_id: 1,
								info: '中大大爆炸'
							},
							{
								name: '中文精讀筆記',
								price: 30,
								product_type: 'note',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/Crowell+and+Slesnick+Calculus.pdf',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/note.jpg',
								subject_id: 1,
								info: '中大大爆炸'
							}
						]
					}
				}
			}
		}
	});

	const arfarteacher7 = await prisma.users.upsert({
		where: { email: 'arfar6@gmail.com' },
		update: {},
		create: {
			user_type: 'teacher',
			username: 'Dennis',
			email: 'arfar6@gmail.com',
			password: 'adminadmin',
			image: 'https://lh5.googleusercontent.com/vG-w1WjrYnoBHv3HgiOueCdXGVdexCGlBFwblUVyQlbv_3Ln3W0pUQslf78nDWrMab_zlWets--ag90NWtnmBzIM8W8YklUVPcFANHf0zPfsljCapi2xhceIuhUwmtq2-LaPTSHXjyikawJGacPQoVNr7A=s2048',
			cart: {
				create: {}
			},
			teacher: {
				create: {
					info: '畢業於香港科技大學市場及管理系，曾於DSE英文考獲5*佳績並擁有5年的教學經驗，清楚了解不同程度的學生會面對的英文難題。',
					school: '香港大學',
					experience: 10,
					product: {
						create: [
							{
								name: '中文精讀班',
								price: 20,
								product_type: 'course',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/Crowell+and+Slesnick+Calculus.pdf',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/note.jpg',
								subject_id: 1,
								info: '中大大爆炸'
							},
							{
								name: '中文精讀筆記',
								price: 30,
								product_type: 'note',

								file_url:
									'https://alphafile.s3.ap-southeast-1.amazonaws.com/Crowell+and+Slesnick+Calculus.pdf',
								image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/note.jpg',
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
		where: { email: 'arfar11@gmail.com' },
		update: {},
		create: {
			user_type: 'student',
			username: '牙丸',
			email: 'arfar11@gmail.com',
			password: 'adminadmin',
			image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/note.jpg',
			cart: {
				create: {}
			},
			purchase_history: {
				create: {
					product_id: 1
				}
			}
		}
	});

	const arfarstudent2 = await prisma.users.upsert({
		where: { email: 'arfar12@gmail.com' },
		update: {},
		create: {
			user_type: 'student',
			username: '學生',
			email: 'arfar12@gmail.com',
			password: 'adminadmin',
			image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/Jisoo_20220329_2.jpg',
			cart: {
				create: {}
			},
			purchase_history: {
				create: [
					{
						product_id: 1
					},
					{ product_id: 2 },
					{ product_id: 3 }
				]
			}
		}
	});

	const arfarstudent3 = await prisma.users.upsert({
		where: { email: 'arfar13@gmail.com' },
		update: {},
		create: {
			user_type: 'student',
			username: '牙花',
			email: 'arfar13@gmail.com',
			password: 'adminadmin',
			image: 'https://alphafile.s3.ap-southeast-1.amazonaws.com/Jisoo_20220329_2.jpg',
			cart: {
				create: {}
			},
			purchase_history: {
				create: {
					product_id: 4
				}
			}
		}
	});
	console.log(fixedSubject, arfarteacher2, arfarstudent3);
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
