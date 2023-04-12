import { useGetOneAttendance } from 'services/attendanceService';
import { AttendanceService } from 'services/attendanceService/attendance';

export { useGetOneAttendance, AttendanceService };

import { AuthService } from './authService/auth';
import type { IOnLogin } from './authService/interface';
export { AuthService, IOnLogin };
