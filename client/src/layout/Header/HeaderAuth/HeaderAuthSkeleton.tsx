import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const HeaderAuthSkeleton: FC = () => {
  return (
    <ContentLoader speed={2} height={37} y={0} width={210} backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
      <rect x="140" y="5" rx="2" ry="3" width="75" height="30" />
      <rect x="0" y="0" rx="0" ry="0" width="37" height="40" />
      <rect x="46" y="2" rx="0" ry="0" width="60" height="16" />
      <rect x="46" y="25" rx="0" ry="0" width="73" height="12" />
    </ContentLoader>
  );
};
export default HeaderAuthSkeleton;
