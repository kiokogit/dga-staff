import { AccountCircle } from '@mui/icons-material'
import { Button, Paper } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout_staff_user } from '../../../../actions/admin/account_actions'
import { COMPANY_NAME } from '../../../../settings/constants'
import './header.css'
import { SideNav } from './side_nav'


export const TopHeader = () => {
    const user = useSelector(state=>state.logged_in_user_details)
    const [showMore, setShowMore] = useState(false)
    const [opensidebar2, setOpensidebar2] = useState(false)
    const dispatch = useDispatch()

    const log_out = (e) => {
        dispatch(logout_staff_user())
        setShowMore(false)
    }


    window.addEventListener('click', function(e){   
        if (document.getElementById('menu_button')?.contains(e.target)){
          // Clicked in box
          if(!opensidebar2){
            setOpensidebar2(false)
          } else{
              setOpensidebar2(true)
          }
        } else{
            setOpensidebar2(false)
        }
      });

//       window.addEventListener('scroll', function(e){   
//         if (e.target.contains(document.getElementById('menu_down'))){
//             // scroll the box
//             setOpensidebar(true)
//           } else{
//               setOpensidebar(false)
//           }
//   });

    window.addEventListener('click', function(e){   
        if (document.getElementById('more_button')?.contains(e.target)){
          // Clicked in box
          if(!showMore){
            setShowMore(false)
          } else{
              setShowMore(true)
          }
        } else{
            setShowMore(false)
        }
      });
      window.addEventListener('scroll', function(e){   
        if (e.target.contains(document.getElementById('more_card'))){
            // scroll the box
            setShowMore(true)
          } else{
              setShowMore(false)
          }
  });

    return (
        <div className="staff_header">
            <div id="company_name">{COMPANY_NAME}</div>
            <div className='header_line'>
                <div className='greeting'>
                    Welcome {user.first_name}
                    <div id='menu_button' className={`side_bar_button`} onClick={e=>setOpensidebar2(!opensidebar2)}>
                        <img src='https://i.pinimg.com/originals/26/9d/d1/269dd16fa1f5ff51accd09e7e1602267.png' alt=''/>
                    </div>
                </div>
                <div className='icons' onClick={e=>setShowMore(true)} id='more_button'>
                    <div>
                        <AccountCircle className='scaled'/>
                    </div>
                    <small>{user.first_name} {user.last_name}</small>
                    {showMore && 
                    <Paper className="paper dropdown_ dropdown_c" id='more_card'>
                        <div className='' onClick={e=>log_out(e)}>
                            <Button>Log Out</Button>
                            </div>
                    </Paper>
                        }
                </div>
            </div>
            <div className={`extra_nav ${!opensidebar2 && 'hide'}`} id="menu_down">
                <SideNav />
            </div>
        </div>
    )
}