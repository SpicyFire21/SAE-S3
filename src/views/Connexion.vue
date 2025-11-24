 <template>
  <div class="w-full h-screen bg-cover bg-center flex items-center justify-center" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-5 text-center text-2xl/9 tracking-tight text-black">{{ t('login.1') }}</h2>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6">
          <div>
            <label for="pseudo" class="block text-sm/6 font-medium text-black">Email</label>
            <div class="mt-2">
              <input v-model="pseudo" type="text" id="pseudo" name="pseudo" required :placeholder="t('login.5')"
                     class="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-red-500 sm:text-sm/6" />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm/6 font-medium text-black">{{ t('login.2') }}</label>
              <div class="text-sm">
                <a href="#" class="text-[var(--jaune)] hover:text-danger">{{ t('login.3') }}</a>
              </div>
            </div>
            <div class="mt-2">
              <input v-model="password" type="password" id="password" name="password" required placeholder="••••••••"
                     class="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-red-500 sm:text-sm/6" />
            </div>
          </div>
          <div>
            <button type="submit"
                    class="flex w-full justify-center rounded-md bg-[var(--jaune)] px-3 py-1.5 text-sm/6 text-white
                         hover:bg-[color-mix(in_srgb,var(--jaune)_85%,black_15%)]
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 tracking-widest">
              {{ t('login.1') }}
            </button>
          </div>
          <div class="text-center mt-6">
            <span>{{ t('login.3') }} ?</span>
            <span class="text-[var(--jaune)] ml-3 cursor-pointer hover:underline">► {{ t('login.4') }}</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import bgImage from '../assets/img/connexionbg.jpg'
import { ref } from 'vue'
import {useI18n} from "vue-i18n";
const {t} = useI18n()
</script>
