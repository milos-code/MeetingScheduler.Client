import React from "react";
import { Dropdown, IDropdownOption, IDropdownStyles, PersonaSize, Persona } from "@fluentui/react";
import { IEmployee } from "../../models";
import "./EmployeesDropdown.css";

interface MultiSelectDropdownProps {
  options: IEmployee[];
  selectedOptions: string[];
  onChange: (selectedIds: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedOptions,
  onChange,
}) => {
  const dropdownOptions: IDropdownOption[] = options.map((employee) => ({
    key: employee.id!,
    text: `${employee.firstName} ${employee.lastName}`,
    data: employee,
  }));

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: '100%' },
    title: { border: '1px solid #ccc', borderRadius: '4px' },
    caretDown: { color: '#333' },
  };

  const handleChange = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => {
    if (item) {
      const newSelectedOptions = item.selected
        ? [...selectedOptions, item.key as string]
        : selectedOptions.filter((id) => id !== item.key);
      onChange(newSelectedOptions);
    }
  };

  const onRenderOption = (option?: IDropdownOption): JSX.Element => {
    if (option) {
      const employee = option.data as IEmployee;
      return (
        <div className="employee-option">
          <Persona
            text={`${employee.firstName} ${employee.lastName}`}
            secondaryText={employee.email}
            tertiaryText={employee.position}
            size={PersonaSize.size32}
          />
        </div>
      );
    }
    return <></>;
  };

  const onRenderTitle = (options?: IDropdownOption[]): JSX.Element => {
    if (options && options.length > 0) {
      return (
        <div className="selected-employees">
          {options.map((option) => (
            <Persona
              key={option.key}
              text={option.text}
              size={PersonaSize.size24}
              styles={{ root: { marginRight: 5 } }}
            />
          ))}
        </div>
      );
    }
    return <span>Select employees</span>;
  };

  return (
    <Dropdown
      placeholder="Select employees"
      multiSelect
      options={dropdownOptions}
      selectedKeys={selectedOptions}
      onChange={handleChange}
      styles={dropdownStyles}
      onRenderOption={onRenderOption}
      onRenderTitle={onRenderTitle}
    />
  );
};

export default MultiSelectDropdown;
