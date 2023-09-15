import { Injectable } from '@nestjs/common';
import * as Docxtemplater from 'docxtemplater';
import * as fs from "fs";
import * as path from "path";
import * as Pizzip from 'pizzip';

@Injectable()
export class AppService {

  async fillDocument(doc: Buffer, args: Record<string, string>){
    const zip = new Pizzip(doc)
    // @ts-ignore
      const res = new Docxtemplater(zip,
        {
          paragraphLoop: true,
          linebreaks: true,
        })

    res.render(args)

    const buf = res.getZip().generate({
      type: "nodebuffer",
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: "DEFLATE",
    });

// buf is a nodejs Buffer, you can either write it to a
// file or res.send it with express for example.
    fs.writeFileSync(path.resolve('./', "output.docx"), buf);
  }
}
