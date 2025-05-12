import { HomeIcon, MapPinIcon, HeartIcon, UserIcon} from '@heroicons/react/24/outline';

export const WeatherNight =()=> {
    return (
        <div>
            <header>
            <FormatDate/>
            {city}
            </header>
            <img src="" alt="" />
            <main>
            {Cells}
            {Feel}
            </main>
            <div className="fixed bottom-4 flex gap-4">
            <button className="p-3 rounded-full bg-gray-800 text-gray-300">
              <HomeIcon className="w-6 h-6" />
            </button>
            <button className="p-3 rounded-full bg-gray-800 text-gray-300">
              <MapPinIcon className="w-6 h-6" />
            </button>
            <button className="p-3 rounded-full bg-gray-800 text-gray-300">
              <HeartIcon className="w-6 h-6" />
            </button>
            <button className="p-3 rounded-full bg-gray-800 text-gray-300">
              <UserIcon className="w-6 h-6" />
              </button> 
            </div>
        </div>
    ) 
}