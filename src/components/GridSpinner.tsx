import dynamic from 'next/dynamic';
import React from 'react';
// import { GridLoader } from 'react-spinners'

const GridLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.GridLoader),
  {
    ssr: false, // 서버에서 미리 랜더링 금지!
  }
);

type Props = {
  color?: string;
};

export default function GridSpinner({ color = 'red' }: Props) {
  return <GridLoader color='red' />;
}
