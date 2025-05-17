import { version } from '../../../package.json'
export default {
  version: version,
  liteMode: import.meta.env.VITE_REACT_APP_LITE_MODE === '1',
}
