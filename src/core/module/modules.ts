import { ModuleClass } from './module.interface';
import { TechnicianModule } from '../../modules/technician/technician.module';
import { AuthModule } from '../../modules/auth/auth.module';
import { AdminModule } from '../../modules/admin/admin.module';
import { ServiceRequestModule } from '../../modules/service-request/service-request.module';

export const modules: ModuleClass[] = [
    AdminModule,
    TechnicianModule,
    ServiceRequestModule,
    AuthModule,
];
 
