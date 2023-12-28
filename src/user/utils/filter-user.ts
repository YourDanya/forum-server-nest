import {filterObject} from 'src/utils/helpers/filter-object/filter-object'
import {User} from 'src/user/user.entity'
import {FilteredUser} from 'src/user/user.types'

export const filterUser = (user: User) => {
    const filteredNames = ['activate', 'activate_user_Code', 'activate_user_expires', 'resend_activate_user']

    return filterObject<FilteredUser>(user, filteredNames)
}