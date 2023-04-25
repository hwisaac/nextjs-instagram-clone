import React from 'react';
import reactDom from 'react-dom';

type Props = { children: React.ReactNode };

export default function ModalPortal({ children }: Props) {
  // 아래와 같이 조건을 걸면 브라우저 환경일 때만 이 컴포넌트가 동작하게 된다.
  if (typeof window === 'undefined') {
    return null;
  }
  const node = document.getElementById('portal') as Element;
  return reactDom.createPortal(children, node);
}
