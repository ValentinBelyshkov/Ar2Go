import './Header.scss';

export const Header = ({ children, height }: { children: JSX.Element | JSX.Element[] | string, height: string }) => {
  return (
    <header style={{ height }}>
      { children }
    </header>
  )
}