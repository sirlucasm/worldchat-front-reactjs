import {
  MyMenu,
  LogoArea,
  DownsideItems,
  Item,
  MenuItems,
  UpsideItems,
} from './styled';
import Image from 'next/image';
import { useAuthentication } from "../../contexts/Authentication";
import router from 'next/router';

export default function Menu() {
  const { currentUser } = useAuthentication();

  const redirectPage = (path) => {
    router.push(path);
  }

  return (
    <MyMenu>
      <LogoArea onClick={() => redirectPage('chats')}>
        <Image src="/assets/icons/world.png" height={40} width={40} alt="logo" />
      </LogoArea>

      <MenuItems>
        <UpsideItems>
          <Item onClick={() => redirectPage('chats')}>
            <i aria-hidden className="fas fa-comment-alt"></i>
          </Item>
          <Item onClick={() => redirectPage('add-friend')}>
            <i aria-hidden className="fas fa-user-plus"></i>
          </Item>
        </UpsideItems>

        <DownsideItems>
          <Item onClick={() => redirectPage('settings')}>
            <i aria-hidden className="fas fa-cog"></i>
          </Item>
          {
            currentUser?.profile_pic ?
            <div className="profile" onClick={() => redirectPage('profile')}>
              <Image className="img" src={currentUser.profile_pic} height={40} width={40} alt="logo" />
            </div>
              :
              <Item onClick={() => redirectPage('profile')}>
                <i aria-hidden className="fas fa-user"></i>
              </Item>
          }

        </DownsideItems>
      </MenuItems>
    </MyMenu>
  )
}