export const adminMenu = [
	{
		// Manage user
		name: 'menu.admin.manage-user',
		menus: [
			{
				// user manage
				name: 'menu.admin.crud',
				link: '/system/user-manage',
			},
			{
				// crud user
				name: 'menu.admin.crud-redux',
				link: '/system/user-redux',
			},
			{
				// manage-doctor
				name: 'menu.admin.manage-doctor',
				link: '/system/manage-doctor',
				// subMenus: [
				// 	{ name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
				// 	{ name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
				// ],
			},
			// { // manage-admin
			// 	name: 'menu.admin.manage-admin',
			// 	link: '/system/user-admin',
			// },
			{
				// Manage schedule doctor
				name: 'menu.doctor.manage-schedule',
				link: '/doctor/manage-schedule',
			},
		],
	},
	{
		// Manage clinic
		name: 'menu.admin.clinic',
		menus: [
			{
				name: 'menu.admin.manage-clinic',
				link: '/system/manage-clinic',
			},
		],
	},
	{
		// Manage specialty
		name: 'menu.admin.specialty',
		menus: [
			{
				name: 'menu.admin.manage-specialty',
				link: '/system/manage-specialty',
			},
		],
	},
	{
		// Manage handbook
		name: 'menu.admin.handbook',
		menus: [
			{
				name: 'menu.admin.manage-handbook',
				link: '/system/manage-handbook',
			},
		],
	},
];

export const doctorMenu = [
	{
		name: 'menu.admin.manage-user',
		menus: [
			{
				// Manage schedule doctor
				name: 'menu.doctor.manage-schedule',
				link: '/doctor/manage-schedule',
			},
		],
	},
];
