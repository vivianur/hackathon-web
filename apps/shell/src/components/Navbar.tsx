import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Box,
	useTheme,
	useMediaQuery,
	Tooltip,
} from "@mui/material";
import {
	Menu as MenuIcon,
	Home,
	Dashboard,
	Assignment,
	Person,
	Settings,
	Language,
	Brightness4,
	Brightness7,
	CalendarToday,
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { useThemeStore, useAnimations } from "@mindease/shared";
import CalendarDialog from "./CalendarDialog";

const spinOnceKf = keyframes`
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
`;

const menuItems = [
	{ title: "Home", path: "/", icon: <Home /> },
	{ title: "Plataforma", path: "/plataforma", icon: <Language /> },
	{ title: "Tarefas", path: "/tarefas", icon: <Assignment /> },
	{ title: "Painel", path: "/painel", icon: <Dashboard /> },
	{ title: "Perfil", path: "/perfil", icon: <Person /> },
	{ title: "Config.", path: "/config", icon: <Settings /> },
];

export default function Navbar() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [calendarOpen, setCalendarOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const location = useLocation();
	const { mode, toggleTheme } = useThemeStore();
	const animations = useAnimations();

	const toggleDrawer = (open: boolean) => () => {
		setDrawerOpen(open);
	};

	const drawer = (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				{menuItems.map((item) => (
					<ListItem key={item.path} disablePadding>
						<ListItemButton
							component={Link}
							to={item.path}
							selected={location.pathname === item.path}
							sx={{
								transition: "all 0.25s ease",
								...(animations.shouldAnimate && {
									"&:hover": {
										backgroundColor: (theme) => theme.palette.action.hover,
									},
								}),
								...(animations.level === "detailed" &&
									animations.shouldAnimate && {
										"&:hover": {
											backgroundColor: (theme) =>
												theme.palette.mode === "light"
													? "#ff00d0"
													: "transparent",
											backgroundImage: (theme) =>
												theme.palette.mode === "light"
													? "none"
													: `linear-gradient(90deg, ${theme.palette.primary.main}22, transparent)`,
											boxShadow: (theme) =>
												theme.palette.mode === "light"
													? `0 0 0 2px rgba(255, 255, 255, 0.9), inset 4px 0 0 0 ${theme.palette.primary.main}`
													: `inset 3px 0 0 0 ${theme.palette.primary.main}`,
											transform: "translateX(3px)",
										},
										"& .MuiListItemIcon-root": {
											transition: "color 0.25s ease, transform 0.25s ease",
										},
										"& .MuiListItemText-primary": {
											transition: "color 0.25s ease",
										},
										"&:hover .MuiListItemIcon-root": {
											color: "primary.main",
											transform: "translateX(2px)",
										},
										"&:hover .MuiListItemText-primary": {
											color: "primary.main",
										},
									}),
							}}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					{isMobile && (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={toggleDrawer(true)}
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
					)}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Hackathon FIAP
					</Typography>
					{!isMobile && (
						<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
							{menuItems.map((item) => (
								<Button
									key={item.path}
									color="inherit"
									component={Link}
									to={item.path}
									startIcon={item.icon}
									sx={{
										backgroundColor:
											location.pathname === item.path
												? "rgba(255, 255, 255, 0.1)"
												: "transparent",
										transition: "all 0.2s ease",
										...(animations.shouldAnimate && {
											"&:hover": {
												backgroundColor: "rgba(255, 255, 255, 0.18)",
												transform: "translateY(-2px)",
											},
										}),
										...(animations.level === "detailed" &&
											animations.shouldAnimate && {
												"&:hover": {
													backgroundColor: (theme) =>
														theme.palette.mode === "light"
															? "#ff00d0"
															: "transparent",
													backgroundImage: (theme) =>
														theme.palette.mode === "light"
															? "none"
															: `linear-gradient(0deg, rgba(255,255,255,0.18), rgba(255,255,255,0.18)), linear-gradient(0deg, ${theme.palette.primary.main}20, ${theme.palette.primary.main}20)`,
													boxShadow: (theme) =>
														theme.palette.mode === "light"
															? `0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 5px ${theme.palette.primary.main}, 0 10px 24px rgba(0,0,0,0.15)`
															: `0 0 0 2px ${theme.palette.primary.main}55, 0 10px 24px rgba(0,0,0,0.25)`,
													filter: "saturate(1.15)",
													transform: "translateY(-3px) scale(1.02)",
												},
												"&:focus-visible": {
													outline: "none",
													boxShadow: (theme) =>
														`0 0 0 2px ${theme.palette.primary.main}77, 0 0 0 4px rgba(255,255,255,0.3)`,
												},
												"& .MuiButton-startIcon": {
													transition:
														"transform 0.25s ease, filter 0.25s ease, color 0.25s ease",
												},
												"&:hover .MuiButton-startIcon": {
													transform: "translateX(2px)",
													filter: "drop-shadow(0 0 4px rgba(255,255,255,0.35))",
													color: (theme) =>
														theme.palette.mode === "light"
															? "rgba(255, 255, 255, 0.95)"
															: "primary.main",
												},
											}),
									}}
								>
									{item.title}
								</Button>
							))}
							<Tooltip title="Calendário de Tarefas">
								<IconButton
									onClick={() => setCalendarOpen(true)}
									color="inherit"
									sx={{
										ml: 1,
										transition: "transform 0.25s ease",
										...(animations.shouldAnimate && {
											"&:hover": {
												boxShadow: (theme) =>
													`0 0 0 2px ${theme.palette.action.hover}`,
											},
											"&:hover svg": {
												transform: "rotate(12deg)",
											},
										}),
										...(animations.level === "detailed" &&
											animations.shouldAnimate && {
												"&:hover": {
													boxShadow: (theme) =>
														`0 0 0 2px ${theme.palette.primary.main}55`,
												},
												"&:hover svg": {
													transform: "rotate(22deg) scale(1.08)",
													filter: "drop-shadow(0 0 6px rgba(255,255,255,0.38))",
												},
												"&:active svg": {
													animation: `${spinOnceKf} 0.55s ease`,
												},
												"&:focus-visible": {
													outline: "none",
													boxShadow: (theme) =>
														`0 0 0 2px ${theme.palette.primary.main}77, 0 0 0 4px rgba(255,255,255,0.3)`,
													borderRadius: "50%",
												},
											}),
									}}
								>
									<CalendarToday />
								</IconButton>
							</Tooltip>
							<Tooltip
								title={
									mode === "light" ? "Ativar modo escuro" : "Ativar modo claro"
								}
							>
								<IconButton
									onClick={toggleTheme}
									color="inherit"
									sx={{
										ml: 1,
										transition: "transform 0.25s ease",
										...(animations.shouldAnimate && {
											"&:hover": {
												boxShadow: (theme) =>
													`0 0 0 2px ${theme.palette.action.hover}`,
											},
											"&:hover svg": {
												transform: "rotate(12deg)",
											},
										}),
										...(animations.level === "detailed" &&
											animations.shouldAnimate && {
												"&:hover": {
													boxShadow: (theme) =>
														`0 0 0 2px ${theme.palette.primary.main}55`,
												},
												"&:hover svg": {
													transform: "rotate(22deg) scale(1.08)",
													filter: "drop-shadow(0 0 6px rgba(255,255,255,0.38))",
												},
												"&:active svg": {
													animation: `${spinOnceKf} 0.55s ease`,
												},
												"&:focus-visible": {
													outline: "none",
													boxShadow: (theme) =>
														`0 0 0 2px ${theme.palette.primary.main}77, 0 0 0 4px rgba(255,255,255,0.3)`,
													borderRadius: "50%",
												},
											}),
									}}
								>
									{mode === "light" ? <Brightness4 /> : <Brightness7 />}
								</IconButton>
							</Tooltip>
						</Box>
					)}
					{isMobile && (
						<>
							<Tooltip title="Calendário de Tarefas">
								<IconButton
									onClick={() => setCalendarOpen(true)}
									color="inherit"
									sx={{
										transition: "transform 0.25s ease",
										...(animations.shouldAnimate && {
											"&:hover": {
												boxShadow: (theme) =>
													`0 0 0 2px ${theme.palette.action.hover}`,
											},
											"&:hover svg": {
												transform: "rotate(12deg)",
											},
										}),
										...(animations.level === "detailed" &&
											animations.shouldAnimate && {
												"&:hover": {
													boxShadow: (theme) =>
														`0 0 0 2px ${theme.palette.primary.main}55`,
												},
												"&:hover svg": {
													transform: "rotate(22deg) scale(1.08)",
													filter: "drop-shadow(0 0 6px rgba(255,255,255,0.38))",
												},
												"&:active svg": {
													animation: `${spinOnceKf} 0.55s ease`,
												},
												"&:focus-visible": {
													outline: "none",
													boxShadow: (theme) =>
														`0 0 0 2px ${theme.palette.primary.main}77, 0 0 0 4px rgba(255,255,255,0.3)`,
													borderRadius: "50%",
												},
											}),
									}}
								>
									<CalendarToday />
								</IconButton>
							</Tooltip>
							<Tooltip
								title={
									mode === "light" ? "Ativar modo escuro" : "Ativar modo claro"
								}
							>
								<IconButton
									onClick={toggleTheme}
									color="inherit"
									sx={{
										transition: "transform 0.25s ease",
										...(animations.shouldAnimate && {
											"&:hover": {
												boxShadow: (theme) =>
													`0 0 0 2px ${theme.palette.action.hover}`,
											},
											"&:hover svg": {
												transform: "rotate(12deg)",
											},
										}),
										...(animations.level === "detailed" &&
											animations.shouldAnimate && {
												"&:hover": {
													boxShadow: (theme) =>
														`0 0 0 2px ${theme.palette.primary.main}55`,
												},
												"&:hover svg": {
													transform: "rotate(22deg) scale(1.08)",
													filter: "drop-shadow(0 0 6px rgba(255,255,255,0.38))",
												},
												"&:active svg": {
													animation: `${spinOnceKf} 0.55s ease`,
												},
												"&:focus-visible": {
													outline: "none",
													boxShadow: (theme) =>
														`0 0 0 2px ${theme.palette.primary.main}77, 0 0 0 4px rgba(255,255,255,0.3)`,
													borderRadius: "50%",
												},
											}),
									}}
								>
									{mode === "light" ? <Brightness4 /> : <Brightness7 />}
								</IconButton>
							</Tooltip>
						</>
					)}
				</Toolbar>
			</AppBar>
			<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
				{drawer}
			</Drawer>
			<CalendarDialog
				open={calendarOpen}
				onClose={() => setCalendarOpen(false)}
			/>
		</>
	);
}
