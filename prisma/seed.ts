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
