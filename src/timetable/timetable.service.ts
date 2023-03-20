import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import { Timetable } from './entities/timetable.entity';

@Injectable()
export class TimetablesService {
  constructor(private prisma: PrismaService) {}
  async create(createTimetableDto: CreateTimetableDto): Promise<string> {
    let cartTimetable = await this.prisma.timetables.create({
      data: {
        time_slot: createTimetableDto.time_slot,
        user_id: createTimetableDto.user_id,
        subject_id: createTimetableDto.subject_id,
      },
    });
    console.log(cartTimetable);
    return 'ok';
  }

  async findAll(): Promise<Timetable[]> {
    return await this.prisma.timetables.findMany();
  }

  async findOne(id: number) {
    let foundTimetable = await this.prisma.timetables.findUnique({
      where: { id },
    });
    if (!foundTimetable) throw new NotFoundException('Cart not found!');
    return foundTimetable;
  }

  async update(id: number, updateTimetableDto: UpdateTimetableDto) {
    let foundTimetable = await this.prisma.timetables.update({
      where: { id },
      data: {
        time_slot: updateTimetableDto.time_slot,
        user_id: updateTimetableDto.user_id,
        subject_id: updateTimetableDto.subject_id,
      },
    });
    if (!foundTimetable) throw new NotFoundException('Cart not found!');
    return ` Cart: #${id} info has been updated`;
    // return foundUser;
  }

  async remove(id: number) {
    let deletedTimetable = await this.prisma.timetables.delete({
      where: { id },
    });
    if (!deletedTimetable) throw new NotFoundException('Cart not found!');
    return `Cart:#${id} has been deleted`;
    // return deletedUser;
  }
}
