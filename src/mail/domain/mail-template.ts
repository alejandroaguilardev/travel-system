import * as fs from 'fs';
import * as path from 'path';
import { TemplateRoute } from './template-routes';

export class MailTemplate {
  static loadTemplate(templatePath: TemplateRoute): string {
    const currentDirectory = process.cwd();
    const isProduction = process.env.PRODUCTION === 'false' ? '' : '/var/task';
    const fullPath = path.join(currentDirectory, isProduction + templatePath);

    const htmlContent = fs.readFileSync(fullPath, 'utf-8');
    return htmlContent;
  }
}
