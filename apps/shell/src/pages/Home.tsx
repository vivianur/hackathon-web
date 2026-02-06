import { Container, Typography, Box, Paper, Button } from "@mui/material";
import {
	Dashboard,
	Assignment,
	Person,
	Settings,
	Psychology,
	AccessTime,
	Language,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import {
	AccessibleContainer,
	AnimatedCard,
	useAnimations,
	useThemeStore,
	useAccessibilityStore,
	useSpacing,
} from "@mindease/shared";

export default function Home() {
	const navigate = useNavigate();
	const animations = useAnimations();
	const mode = useThemeStore((state) => state.mode);
	const detailedMode = useAccessibilityStore((state) => state.detailedMode);
	const complexityLevel = useAccessibilityStore(
		(state) => state.complexityLevel,
	);
	const spacing = useSpacing();

	const getFeatureColor = (originalColor: string) => {
		if (!detailedMode) return originalColor;
		// Modo monocromático: usar tons de cinza diferentes para cada feature
		if (originalColor === "#1976d2")
			return mode === "light" ? "#555555" : "#999999";
		if (originalColor === "#ed6c02")
			return mode === "light" ? "#666666" : "#888888";
		if (originalColor === "#2e7d32")
			return mode === "light" ? "#444444" : "#aaaaaa";
		if (originalColor === "#9c27b0")
			return mode === "light" ? "#555555" : "#999999";
		return originalColor;
	};

	const getHoverBg = (originalBg: string, color: string) => {
		if (!detailedMode) return originalBg;
		const monoColor = getFeatureColor(color);
		return `${monoColor}20`;
	};

	const features = [
		{
			icon: <Language sx={{ fontSize: 48 }} />,
			title: "Plataforma",
			description: "Explore ferramentas e recursos disponíveis na plataforma",
			path: "/plataforma",
			color: getFeatureColor("#1976d2"),
			hoverBg: getHoverBg("rgba(25, 118, 210, 0.12)", "#1976d2"),
		},
		{
			icon: <Assignment sx={{ fontSize: 48 }} />,
			title: "Organizador de Tarefas",
			description: "Gerencie atividades com suporte Kanban e timer Pomodoro",
			path: "/tarefas",
			color: getFeatureColor("#ed6c02"),
			hoverBg: getHoverBg("rgba(237, 108, 2, 0.12)", "#ed6c02"),
		},
		{
			icon: <Dashboard sx={{ fontSize: 48 }} />,
			title: "Painel Cognitivo",
			description:
				"Personalize a interface de acordo com suas necessidades cognitivas",
			path: "/painel",
			color: getFeatureColor("#2e7d32"),
			hoverBg: getHoverBg("rgba(46, 125, 50, 0.12)", "#2e7d32"),
		},
		{
			icon: <Person sx={{ fontSize: 48 }} />,
			title: "Perfil",
			description: "Configure suas preferências e rotina de estudos",
			path: "/perfil",
			color: getFeatureColor("#9c27b0"),
			hoverBg: getHoverBg("rgba(156, 39, 176, 0.12)", "#9c27b0"),
		},
		{
			icon: <Settings sx={{ fontSize: 48 }} />,
			title: "Configurações",
			description: "Ajuste notificações e preferências do sistema",
			path: "/config",
			color: getFeatureColor("#d32f2f"),
			hoverBg: getHoverBg("rgba(211, 47, 47, 0.12)", "#d32f2f"),
		},
	];

	return (
		<AccessibleContainer disableFocusBlur>
			<Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
				<Box sx={{ mb: 6, textAlign: "center", ...animations.fadeIn }}>
					<Psychology sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
					<Typography
						variant="h2"
						component="h1"
						gutterBottom
						fontWeight="bold"
					>
						MindEase
					</Typography>
					<Typography variant="h5" color="text.secondary" paragraph>
						Plataforma de Acessibilidade Cognitiva
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ maxWidth: 800, mx: "auto" }}
					>
						Desenvolvida para facilitar a vida acadêmica e profissional de
						pessoas neurodivergentes e/ou com desafios de processamento
						cognitivo.
					</Typography>
				</Box>

				<Grid container spacing={spacing.gridSpacing} sx={{ mb: 6 }}>
					{features.map((feature, index) => (
						<Grid
							size={{ xs: 12, sm: 6, md: 2.4 }}
							key={feature.path}
							sx={animations.staggerDelay(index)}
						>
							<AnimatedCard
								animationType="grow"
								delay={index * 100}
								sx={{
									height: "100%",
									cursor: "pointer",
									transition: "all 0.3s",
									...animations.cardHover,
									...(animations.level === "detailed" &&
										mode === "light" && {
											"&:hover": {
												transform: "translateY(-10px)",
												boxShadow: "0 10px 30px rgba(255, 121, 198, 0.25)",
												borderColor: feature.color,
												backgroundColor: feature.hoverBg,
											},
										}),
									...(animations.level === "detailed" &&
										mode === "dark" && {
											"&:hover": {
												transform: "translateY(-10px)",
												boxShadow: `0 10px 30px ${feature.color}50`,
												borderColor: feature.color,
												backgroundColor: `${feature.color}20`,
											},
										}),
									...(mode === "dark" && {
										"&:hover": {
											boxShadow: `0 5px 20px ${feature.color}40`,
											borderColor: feature.color,
											backgroundColor: `${feature.color}15`,
										},
									}),
								}}
								onClick={() => navigate(feature.path)}
							>
								<Box sx={{ textAlign: "center" }}>
									<Box
										sx={{
											color: feature.color,
											mb: 2,
											...(animations.level === "detailed" && {
												animation: "pulseIcon 1.8s ease-in-out infinite",
												"@keyframes pulseIcon": {
													"0%, 100%": { transform: "scale(1)" },
													"50%": { transform: "scale(1.08)" },
												},
											}),
										}}
									>
										{feature.icon}
									</Box>
									<Typography variant="h6" gutterBottom fontWeight="bold">
										{feature.title}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{feature.description}
									</Typography>
								</Box>
							</AnimatedCard>
						</Grid>
					))}
				</Grid>

				<Paper
					sx={{
						p: 4,
						mb: 4,
						textAlign: "center",
						background: detailedMode
							? mode === "light"
								? "linear-gradient(135deg, #666666 0%, #555555 100%)"
								: "linear-gradient(135deg, #888888 0%, #999999 100%)"
							: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
						color: "white",
						...animations.slideUp,
						...(animations.level === "detailed" && {
							position: "relative",
							overflow: "hidden",
							"&::after": {
								content: '""',
								position: "absolute",
								inset: 0,
								background: detailedMode
									? mode === "light"
										? "linear-gradient(45deg, rgba(100, 100, 100, 0.25), rgba(120, 120, 120, 0.25))"
										: "linear-gradient(45deg, rgba(150, 150, 150, 0.25), rgba(170, 170, 170, 0.25))"
									: "linear-gradient(45deg, rgba(255, 121, 198, 0.25), rgba(102, 126, 234, 0.25))",
								mixBlendMode: "screen",
								animation: "gradientShift 6s ease-in-out infinite",
								pointerEvents: "none",
							},
							"@keyframes gradientShift": {
								"0%": { transform: "translateX(-10%) scale(1)" },
								"50%": { transform: "translateX(10%) scale(1.05)" },
								"100%": { transform: "translateX(-10%) scale(1)" },
							},
						}),
					}}
				>
					<Typography variant="h5" gutterBottom fontWeight="bold">
						🎯 Recursos Principais
					</Typography>
					<Grid container spacing={spacing.gridSpacing} sx={{ mt: 2 }}>
						<Grid size={{ xs: 12, md: 6 }}>
							<Box
								sx={{
									display: "flex",
									gap: 2,
									mb: 2,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Dashboard />
								<Box>
									<Typography variant="subtitle1" fontWeight="bold">
										Interface Personalizável
									</Typography>
									<Typography variant="body2">
										Ajuste complexidade, contraste, fonte e espaçamento
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 6 }}>
							<Box
								sx={{
									display: "flex",
									gap: 2,
									mb: 2,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Assignment />
								<Box>
									<Typography variant="subtitle1" fontWeight="bold">
										Gestão Cognitiva de Tarefas
									</Typography>
									<Typography variant="body2">
										Kanban visual com checklist e timer Pomodoro
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 6 }}>
							<Box
								sx={{
									display: "flex",
									gap: 2,
									mb: 2,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Psychology />
								<Box>
									<Typography variant="subtitle1" fontWeight="bold">
										Alertas Cognitivos
									</Typography>
									<Typography variant="body2">
										Notificações inteligentes e mensagens de incentivo
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 6 }}>
							<Box
								sx={{
									display: "flex",
									gap: 2,
									mb: 2,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<AccessTime />
								<Box>
									<Typography variant="subtitle1" fontWeight="bold">
										Modo Foco
									</Typography>
									<Typography variant="body2">
										Reduza distrações e mantenha a concentração
									</Typography>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Paper>

				{complexityLevel === "detailed" && (
					<Paper
						sx={{
							p: 3,
							bgcolor: detailedMode
								? mode === "light"
									? "#666666"
									: "#888888"
								: "info.main",
							color: "white",
							...animations.slideUp,
						}}
					>
						<Typography variant="h6" gutterBottom fontWeight="bold">
							🧠 Suporte para Neurodivergências
						</Typography>
						<Typography variant="body1">
							TDAH • TEA (Autismo) • Dislexia • Burnout • Ansiedade • Sobrecarga
							Sensorial
						</Typography>
						<Button
							variant="contained"
							sx={{
								mt: 2,
								bgcolor: "white",
								color: "info.main",
								"&:hover": { bgcolor: "grey.100" },
								...(animations.level === "detailed" && {
									boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
									transform: "translateY(0)",
									transition: "all 0.2s ease",
									"&:hover": {
										transform: "translateY(-3px) scale(1.01)",
										boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
									},
								}),
							}}
							onClick={() => navigate("/perfil")}
						>
							Configure seu Perfil
						</Button>
					</Paper>
				)}
			</Container>
		</AccessibleContainer>
	);
}
