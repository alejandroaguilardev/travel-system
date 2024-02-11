import * as fs from 'fs';
import * as path from 'path';
import { TemplateRoute } from './template-routes';

export class MailTemplate {
  static loadTemplate(templatePath: TemplateRoute): string {
    const currentDirectory = process.cwd();
    const fullPath = path.join(currentDirectory, templatePath);

    const htmlContent = fs.readFileSync(fullPath, 'utf-8');
    return htmlContent;
  }
}
