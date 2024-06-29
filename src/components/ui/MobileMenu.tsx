import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Hide,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Show,
} from "@chakra-ui/react";

const MobileMenu = () => {
  return (
    <Show below="md">
      <Menu isLazy>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          size="lg"
        >
          <Portal>
            <MenuList>
              <MenuItem>Item 1</MenuItem>
              <MenuItem>Item 2</MenuItem>
              <MenuItem>Item 3</MenuItem>
            </MenuList>
          </Portal>
        </MenuButton>
      </Menu>
    </Show>
  );
};

export default MobileMenu;
