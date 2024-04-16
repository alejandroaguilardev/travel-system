import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class RecaptchaMiddleware implements NestMiddleware {
  private isProductionMode: string;
  constructor() {
    this.isProductionMode = process.env.PRODUCTION;
  }
  async use(req: Request, res: Response, next: NextFunction) {
    if (this.getProductionMode()) {
      next();
      return;
    }
    const token = req.headers['g-recaptcha-response'];

    if (!token) {
      return res.status(400).json({ error: 'No reCAPTCHA token provided' });
    }

    try {
      const response = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        null,
        {
          params: {
            secret: process.env.RE_CAPTCHA_SECRET,
            response: token,
          },
        },
      );
      if (response.data.success) {
        next();
      } else {
        return res.status(400).json({ error: 'reCAPTCHA verification failed' });
      }
    } catch (error) {
      console.error('Error verifying reCAPTCHA token:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  private getProductionMode() {
    return this.isProductionMode === 'false';
  }
}
