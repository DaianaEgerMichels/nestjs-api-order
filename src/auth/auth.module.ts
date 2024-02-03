import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Global() // for use in all modules
@Module({
  imports: [
    JwtModule.register({
      global: true, // for use in all modules
      secret: 'secret12345', // example for development. Should be stored in .env file
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard], // for use in other modules
})
export class AuthModule {}
