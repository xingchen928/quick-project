import SimpleCommand from './component/SimpleCommand'
import SimpleList from './component/SimpleList'
import RootList from './component/RootList'

const ComponentMap = {
  'root-list': RootList,
  'simple-list': SimpleList,
  'simple-command': SimpleCommand,
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