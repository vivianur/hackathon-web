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
	Explore,
	Brightness4,
	Brightness7,
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useThemeStore } from "../stores/themeStore";

const menuItems = [
	{ title: "Home", path: "/", icon: <Home /> },
	{ title: "Painel", path: "/painel", icon: <Dashboard /> },
	{ title: "Tarefas", path: "/tarefas", icon: <Assignment /> },
	{ title: "Perfil", path: "/perfil", icon: <Person /> },
	{ title: "Config.", path: "/config", icon: <Settings /> },
	{ title: "Explore", path: "/explore", icon: <Explore /> },
];

export default function Navbar() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const location = useLocation();
	const { mode, toggleTheme } = useThemeStore();

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
						MindEase
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
									}}
								>
									{item.title}
								</Button>
							))}
							<Tooltip
								title={
									mode === "light" ? "Ativar modo escuro" : "Ativar modo claro"
								}
							>
								<IconButton
									onClick={toggleTheme}
									color="inherit"
									sx={{ ml: 1 }}
								>
									{mode === "light" ? <Brightness4 /> : <Brightness7 />}
								</IconButton>
							</Tooltip>
						</Box>
					)}
					{isMobile && (
						<Tooltip
							title={
								mode === "light" ? "Ativar modo escuro" : "Ativar modo claro"
							}
						>
							<IconButton onClick={toggleTheme} color="inherit">
								{mode === "light" ? <Brightness4 /> : <Brightness7 />}
							</IconButton>
						</Tooltip>
					)}
				</Toolbar>
			</AppBar>
			<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
				{drawer}
			</Drawer>
		</>
	);
}
