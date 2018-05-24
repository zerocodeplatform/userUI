export interface FieldInterface {
  type?: string; // Text,Boolean,Currency,Integer,Picklist (Custom)
  name: string;
  label: string;
  defaultValue?: string;
  hidden?: boolean;
  placeHolder?: string;
  rules?: {
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    emailValidator?: boolean;
  };
  settings?: {
    type?: string,
    style?: string,
    disabled?: boolean;
    invert?: boolean;
    max?: number;
    min?: number;
    step?: number;
    thumbLabel?: boolean;
    tickInterval?: number;
    vertical?: boolean;
    checked?: boolean
  };
  options?: [
    {
      value?: string;
      label?: string
    }
  ];
  value?: any;
  order?: number;
  style?: {};
  // alias?: string;
  // attr?: string;

  // validation?: {
  //   required?: boolean;
  //   maxLength?: number;
  //   minLength?: number;
  //   pattern?: string;
  //   emailValidator?: boolean;
  // };
}

// TODO: Change the interface to load based on the type.
