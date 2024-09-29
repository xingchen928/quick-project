import SimpleCommand from './component/SimpleCommand'
import SimpleList from './component/SimpleList'
import RootList from './component/RootList'
import LogDisplay from './component/LogDisplay'
import MainConfigReload from './component/MainConfigReload'

const ComponentMap = {
  'RootList': RootList,
  'SimpleList': SimpleList,
  'SimpleCommand': SimpleCommand,
  'LogDisplay': LogDisplay,
  'MainConfigReload': MainConfigReload,
};

export default function App({ data, global }) {
  if (typeof data !== 'object' || data === null || data === undefined || !('template' in data)) {
    return <></>
  }

  const Component = ComponentMap[data.template];
  if (!Component) {
    return <p>unknown component: {data.template}</p>;
  }
  return <Component data={data} global={global} />;
}