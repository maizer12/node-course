export interface InputProps {
  type: 'field' | 'tag';
  value: string | string[];
  placeholder?: string;
  setValue: (a: string[] | string) => void;
}
