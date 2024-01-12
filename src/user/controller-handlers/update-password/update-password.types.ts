import {WithUserRequest} from 'src/user/user.types'

export type UpdatePasswordRequest = WithUserRequest<any, any, {currentPassword: string, newPassword: string, newPasswordConfirm: string}>