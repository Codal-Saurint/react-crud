import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Dropdown = ({ actionsArray }) => {
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  return (
    <ButtonDropdown
      toggle={() => {
        setOpen(!dropdownOpen);
      }}
      isOpen={dropdownOpen}
    >
      <DropdownToggle className="text-black !pr-8 !hover:bg-transparent" caret>
        {actionsArray[0].name}
      </DropdownToggle>
      <DropdownMenu className="rounded-none">
        {actionsArray.map((data) => (
          <DropdownItem>{data.name}</DropdownItem>
        ))}
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default Dropdown;
