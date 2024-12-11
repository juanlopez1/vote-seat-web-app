import type { FC, PropsWithChildren } from 'react';

const Table: FC<PropsWithChildren> = ({ children }) => <div className="lists-table">{children}</div>;

type TRowProps = PropsWithChildren & {
    gridTemplateColumns: string;
};

const TRow: FC<TRowProps> = ({ children, gridTemplateColumns }) => (
    <div className="lists-table__row" style={{ gridTemplateColumns }}>
        {children}
    </div>
);

const THead: FC<PropsWithChildren> = ({ children }) => <div className="lists-table__header">{children}</div>;

const TCell: FC<PropsWithChildren> = ({ children }) => <div className="lists-table__cell">{children}</div>;

export { THead };
export { TRow };
export { TCell };
export default Table;
