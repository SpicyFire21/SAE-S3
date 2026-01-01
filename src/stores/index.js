// src/stores/index.js
import { useUserStore } from './modules/user'
import { useTicketsStore } from './modules/tickets'
import { useFilmsStore } from './modules/films'
import { useAdminStore } from './modules/admin'

import { useGoodiesStore } from './modules/goodies'
import { useReservationsStore } from './modules/reservations.js'
import { useStandsStore } from './modules/stands.js'
import { useAutographsStore } from './modules/autographs.js'

export { useUserStore,useAdminStore,useFilmsStore,useTicketsStore,useGoodiesStore,useReservationsStore,useStandsStore, useAutographsStore }
