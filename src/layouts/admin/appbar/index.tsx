import  Badge  from '@mui/material/Badge'
import Link from 'next/link'
import AccountMenu from './AccountMenu'
export default function AppBar() {

  return (
    <>
      <header className={`h-16 bg-white shadow flex my-auto justify-end`}>
        <div className="flex h-16 items-center justify-end px-4 my-auto">
          {/* <h1 className="hidden text-xl lg:block">Admin Panel</h1> */}
          <div className="flex items-center gap-6">
            <Badge badgeContent={0} color="warning">
              <Link href="/admin/notifications">
                {/* <a className="cursor-pointer rounded-lg bg-amber-100 p-2">
                  <NotificationAdd className="h-6 w-6 text-amber-700" />
                </a> */}
              </Link>
            </Badge>
            <Badge color="primary" variant="dot" invisible>
              <Link href="/admin/users">
                {/* <a className="cursor-pointer rounded-lg bg-blue-100 p-2">
                  <Person className="h-6 w-6 text-blue-700" />
                </a> */}
              </Link>
            </Badge>
            <AccountMenu />
          </div>
        </div>
      </header>
    </>
  )
}