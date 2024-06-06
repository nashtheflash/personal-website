import Image from 'next/image';

export function MdxImage(props) {
  return <Image {...props} alt={props.alt}/>;
}
