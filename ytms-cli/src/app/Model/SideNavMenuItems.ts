interface MenuItem {
    number: number;
    name: string;
    icon: string;
    routing: string;
}

const sideNavForTechnicalManager: MenuItem[] = [
    {
      number: 1,
      name: 'Dashboard',
     icon: 'fa-solid fa-home',
     routing: ''
    },
    {
      number: 2,
      name: 'Schedule',
      icon: 'fa-solid fa-calendar-days',
      routing: '/book-calendar'

    },
    {
      number: 3,
      name: 'Training Request',
      icon: 'fa-solid fa-person-chalkboard',
      routing: '/tm-training-req'
    },
    {
      number: 4,
      name: 'View Training Request',
      icon: 'fa-regular fa-rectangle-list',
      routing: '/tm-view-trf'
    },
    
    {
      number: 5,
      name: 'All Trainings',
      icon: 'fa fa-eye',
      routing: '/tm-view-trainer-form'
    },
    {
      number: 6,
      name: 'Associate Summary',
      icon: 'fa-solid fa-users',
      routing: '/tm-associate-summary'
    },
    {
      number: 7,
      name: 'Manage Associate',
      icon: 'fa fa-id-card-o',
      routing: '/tm-manage-associate'

    }
  ]

  const sideNavForCompetencyManager: MenuItem[] =[
    {
      number: 1,
      name: 'Dashboard',
     icon: 'fa-solid fa-home',
     routing: ''
    },
    {
      number: 2,
      name: 'Schedule',
      icon: 'fa-solid fa-calendar-days',
      routing: '/book-calendar'

    },
    {
      number: 3,
      name: 'View Training Request',
      icon: 'fa-regular fa-rectangle-list',
      routing: '/tm-view-trf'
    },
    
    {
      number: 4,
      name: 'All Trainings',
      icon: 'fa fa-eye',
      routing: '/tm-view-trainer-form'
    },
    {
      number: 5,
      name: 'Associate Summary',
      icon: 'fa-solid fa-users',
      routing: '/tm-associate-summary'
    },
    {
      number: 6,
      name: 'Manage Associate',
      icon: 'fa fa-id-card-o',
      routing: '/tm-manage-associate'

    }
  ]

const sideNavForTrainer: MenuItem[] =[
    {
      number: 1,
      name: 'Dashboard',
     icon: 'fa-solid fa-home',
     routing: ''
    },
    {
      number: 2,
      name: 'My Schedule',
      icon: 'fa-solid fa-calendar-days',
      routing:'/trainer/trainer-calendar'

    },
    {
      number: 3,
      name: 'Training Request',
      icon: 'fa-solid fa-person-chalkboard',
      routing: '/trainer/training-req'
    },
    {
      number: 4,
      name: 'View Training Request',
      icon: 'fa-regular fa-rectangle-list',
      routing: '/trainer/view-trf'
    },
    {
      number: 5,
      name: 'View My Trainings',
      icon: 'fa fa-eye',
      routing: '/trainer/view-trainer-form'
    }
  ]

const sideNavForRequester: MenuItem[] = [
    {
      number: 1,
      name: 'Dashboard',
     icon: 'fa-solid fa-home',
     routing: ''
    },
    {
      number: 2,
      name: 'Training Request',
      icon: 'fa-solid fa-person-chalkboard',
      routing: '/re-training-req'
    },
    {
      number: 3,
      name: 'View Training Request',
      icon: 'fa-regular fa-rectangle-list',
      routing: '/re-view-trf'

    },
    {
      number: 4,
      name: 'Training Status Reports',
      icon: 'fa fa-eye',
      routing: '/requester/view-trainer-form'

    },
    {
      number: 5,
      name: 'Associate Summary',
      icon: 'fa-solid fa-users',
      routing: '/re-associate-summary'

    },
    {
      number: 6,
      name: 'Manage Associate',
      icon: 'fa fa-id-card-o',
      routing: '/re-manage-associate'

    }
  ]

export const MenuItems = {
    sideNavForTechnicalManager,
    sideNavForCompetencyManager,
    sideNavForTrainer,
    sideNavForRequester,
  };
  
  export default MenuItems;