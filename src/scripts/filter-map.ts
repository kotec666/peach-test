// moscow Москва
// voronej Воронеж
// yaroslavl Ярославль
// belgorod Белгород
// peterburg Санкт-Петербург
// kaliningrad Калининград
// rostov Ростов-на-Дону
// krasnodar Краснодар
// volgograd Волгоград
// kazan Казань
// samara Самара
// ufa Уфа
// orenburg Оренбург
// nijninov Нижний Новгород
// ekb Екатеринбург
// chelyabinsk Челябинск
// perm Пермь
// surgut Сургут
// tumen Тюмень
// ijevsk Ижевск
// novosibirsk Новосибирск
// omsk Омск
// tomsk Томск
// krasnoyarsk Красноярск
// irkutsk Иркутск
// khabarovsk Хабаровск
// vladivostok Владивосток

const dropdownElement = document.querySelector('.offices__regions') as HTMLElement
const control = document.querySelector('.offices__filters-control') as HTMLElement
const dropdownArrow = document.querySelector('.offices__toggle-icon') as HTMLElement
const filter = document.querySelector('.filter') as HTMLElement

window.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 1024) {
        control.appendChild(dropdownElement)
    }
})

const openCloseDropdown = () => {
    if (dropdownElement.style.display === 'none') {
        dropdownElement.style.display = 'grid'
        dropdownArrow.style.rotate = '180deg'
        if (window.innerWidth < 1024) {
            filter.style.display = 'none'
        }
    } else {
        dropdownElement.style.display = 'none'
        dropdownArrow.style.rotate = '0deg'
        if (window.innerWidth < 1024) {
            filter.style.display = 'flex'
        }
    }
}

const closeDropdown = () => {
    dropdownElement.style.display = 'none'
    dropdownArrow.style.rotate = '0deg'

    if (window.innerWidth < 1024) {
        filter.style.display = 'flex'
    }
}

document?.querySelector('.offices__toggle')?.addEventListener('click', openCloseDropdown)

type Regions = {
    [key: string]: string[];
};

const regions: Regions = {
    all: ['moscow', 'voronej', 'yaroslavl', 'belgorod', 'peterburg', 'kaliningrad',
        'rostov', 'krasnodar', 'volgograd', 'kazan', 'samara', 'ufa', 'orenburg',
        'nijninov', 'ekb', 'chelyabinsk', 'perm', 'surgut', 'tumen', 'ijevsk',
        'novosibirsk', 'omsk', 'tomsk', 'krasnoyarsk', 'irkutsk', 'khabarovsk', 'vladivostok'],
    moscow: ['moscow',],
    center: ['voronej', 'yaroslavl', 'belgorod'],
    northwest: ['peterburg', 'kaliningrad'],
    south: ['rostov', 'krasnodar', 'volgograd'],
    volga: ['kazan', 'samara', 'ufa', 'orenburg', 'nijninov'],
    ural: ['ekb', 'chelyabinsk', 'perm', 'surgut', 'tumen', 'ijevsk'],
    siberia: ['novosibirsk', 'omsk', 'tomsk', 'krasnoyarsk', 'irkutsk'],
    "far-east": ['khabarovsk', 'vladivostok'],
}

const getFilterButtons = () => {
    [...document.querySelectorAll('.filter__item'), ...document.querySelectorAll('.offices__city')].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target as HTMLElement;
            const url = target?.getAttribute('href') || '';

            history.pushState(null, '', url);

            updateMarkersBasedOnUrl(url, true);
        });
    });
}
getFilterButtons()


window.addEventListener('popstate', () => {
    updateMarkersBasedOnUrl(window.location.pathname, false);
});

window.addEventListener('DOMContentLoaded', () => {
    // если пользователь захочет поделиться ссылкой ->
    updateMarkersBasedOnUrl(window.location.pathname, false);
});

const getSelectedRegionFromUrl = (url: string): string => {
    const region = url.split('/').pop()
    return region || 'all'
}

const getSelectedCityFromUrl = (url: string): string | null => {
    const city = url.split('/').pop() || ''

    const foundedIdx = regions.all.indexOf(city)
    if (foundedIdx !== -1) {
        // city code
        return regions.all[foundedIdx]
    }

    return null
}

const getVisibleCities = (region: string): string[] => {
    return regions[region] || regions.all;
}

const updateActiveFilterButton = (region: string) => {
    // апдейт кнопки фильтра (красное подсвечивание)
    const regionCodes = Object.keys(regions)

    if (regionCodes.indexOf(region) !== -1) {
        for (let regionCode of regionCodes) {
            document?.querySelector(`#${regionCode}`)?.classList.remove('filter__item--active')
        }
        document?.querySelector(`#${region}`)?.classList.add('filter__item--active')
    }
}

const hideAllCities = () => {
    regions.all.forEach(cityCode => {
        const nodes = document.querySelectorAll(`.${cityCode}`);
        for (let node of nodes) {
            const htmlNode = node as HTMLElement
            htmlNode.style.display = 'none'
        }
    })
}

const findRegionForCity = (city: string): string => {
    for (const [region, cities] of Object.entries({...regions, all: ['']})) {
        if (cities.includes(city)) {
            return region
        }
    }

    return 'all';
}

function updateMarkersBasedOnUrl(url: string, needClose = true) {
    const city = getSelectedCityFromUrl(url)

    if (city) {
        hideAllCities()
        const currentRegion = findRegionForCity(city)
        updateActiveFilterButton(currentRegion)

        const nodes = document.querySelectorAll(`.${city}`);
        for (let node of nodes) {
            const htmlNode = node as HTMLElement
            htmlNode.style.display = 'block'
        }

        if (needClose) {
            closeDropdown()
        }
    } else {
        const region = getSelectedRegionFromUrl(url)
        updateActiveFilterButton(region)
        const cities = getVisibleCities(region)
        hideAllCities()

        cities.forEach(cityCode => {
            const nodes = document.querySelectorAll(`.${cityCode}`);
            for (let node of nodes) {
                const htmlNode = node as HTMLElement
                htmlNode.style.display = 'block'
            }
        })

        if (needClose) {
            closeDropdown()
        }
    }

}