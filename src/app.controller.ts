import {Body, Controller, Get, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe} from '@nestjs/common';
import {AppService} from './app.service';
import {Response} from 'express';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('/document')
  @UseInterceptors(FileInterceptor('pdf-file'))
  @UsePipes(new ValidationPipe({whitelist: true}))
  async fillDocument(@UploadedFile() file : Express.Multer.File, @Body() args : Record<string, string>){
   await this.appService.fillDocument(file.buffer, args)
  }

}
