import anitaLal from '../assets/clients/anita_lal.jpg'
import mukeshAmbani from '../assets/clients/mukesh_ambani.jpg'
import peyushBansal from '../assets/clients/peyush_bansal.jpg'
import riteshMalik from '../assets/clients/ritesh_malik.jpg'
import rizwanSajan from '../assets/clients/rizwan_sajan.jpg'
import sarahSham from '../assets/clients/sarah_sham.jpg'
import shilpa from '../assets/clients/shilpa.jpg'

type Client = { id: number; img: string; alt: string }

const clientsDesktopData: Client[] = [
    { id: 6, img: anitaLal, alt: 'Anita Lal' },
    { id: 1, img: mukeshAmbani, alt: 'Mukesh Ambani' },
    { id: 3, img: peyushBansal, alt: 'Peyush Bansal' },
    { id: 7, img: riteshMalik, alt: 'Ritesh Malik' },
    { id: 5, img: rizwanSajan, alt: 'Rizwan Sajan' },
    { id: 4, img: sarahSham, alt: 'Sarah Sham' },
    { id: 2, img: shilpa, alt: 'Shilpa' },
]

const clientsMobileData: Client[] = [
    { id: 6, img: anitaLal, alt: 'Anita Lal' },
    { id: 1, img: mukeshAmbani, alt: 'Mukesh Ambani' },
    { id: 3, img: peyushBansal, alt: 'Peyush Bansal' },
    { id: 7, img: riteshMalik, alt: 'Ritesh Malik' },
    { id: 5, img: rizwanSajan, alt: 'Rizwan Sajan' },
    { id: 4, img: sarahSham, alt: 'Sarah Sham' },
    { id: 2, img: shilpa, alt: 'Shilpa' },
]

const sortById = (a: Client, b: Client) => a?.id - b?.id

export const clientsDesktop = [...clientsDesktopData]?.sort(sortById)

export const clientsMobile = [...clientsMobileData]?.sort(sortById)
