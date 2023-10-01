import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {AppService} from './app.service';
import {Response} from 'express';
import {FileInterceptor} from "@nestjs/platform-express";
import {ResponseMeta} from "./dto/response";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('/document')
  @UseInterceptors(FileInterceptor('pdf-file'))
  @UsePipes(new ValidationPipe({whitelist: true}))
  async fillDocument(
      @UploadedFile() file : Express.Multer.File,
      @Body() args : Record<string, string>,
      @Res() res: Response
      ){
   try {
     await this.appService.fillDocument(file.buffer, args)
     let body : ResponseMeta = {
       message: "dokumen berhasil dibuat"
     }
     res.status(200).send()
   }catch (e) {

   }
  }

}
