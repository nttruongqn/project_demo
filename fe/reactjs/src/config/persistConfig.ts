import storage from 'redux-persist/lib/storage'; // import storage engine
import { PersistConfig } from 'redux-persist/es/types'; // import PersistConfig type
import { RootState } from '../app/store';

const persistConfig: PersistConfig<RootState> = {
  key: 'root', // khóa gốc cho Redux Persist
  storage, // loại storage sử dụng (localStorage, AsyncStorage)
  blacklist: [''], // reducer không được persist
  whitelist: ['currentUser'], // chỉ persist những reducer được liệt kê
};

export default persistConfig;