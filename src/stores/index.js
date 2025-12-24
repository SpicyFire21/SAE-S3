// src/stores/index.js
import { useUserStore } from './modules/user'
import { useTicketsStore } from './modules/tickets'
import { useFilmsStore } from './modules/films'
import { useAdminStore } from './modules/admin'

import { useGoodiesStore } from './modules/goodies'


export { useUserStore,useAdminStore,useFilmsStore,useTicketsStore,useGoodiesStore }
