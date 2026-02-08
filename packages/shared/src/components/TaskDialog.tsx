import {
	Box,
	Button,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useTaskStore } from "../stores/taskStore";
import type { TaskPriority, TaskStatus } from "../domain/entities/Task";

export default function TaskDialog() {
	const [open, setOpen] = useState(false);
	const { addTask } = useTaskStore();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "todo" as TaskStatus,
		priority: "medium" as TaskPriority,
		estimatedTime: 25,
		tags: [] as string[],
	});

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setFormData({
			title: "",
			description: "",
			status: "todo",
			priority: "medium",
			estimatedTime: 25,
			tags: [],
		});
	};

	const handleSubmit = () => {
		if (!formData.title.trim()) return;

		addTask({
			...formData,
			tags: formData.tags,
		});
		handleClose();
	};

	return (
		<>
			<Button
				variant="contained"
				startIcon={<Add />}
				onClick={handleOpen}
				size="large"
			>
				Nova Tarefa
			</Button>

			<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
				<DialogTitle>Criar Nova Tarefa</DialogTitle>
				<DialogContent>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
						<TextField
							label="Título"
							fullWidth
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
							autoFocus
						/>
						<TextField
							label="Descrição"
							fullWidth
							multiline
							rows={3}
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
						/>
						<FormControl fullWidth>
							<InputLabel>Prioridade</InputLabel>
							<Select
								value={formData.priority}
								label="Prioridade"
								onChange={(e) =>
									setFormData({
										...formData,
										priority: e.target.value as TaskPriority,
									})
								}
							>
								<MenuItem value="low">Baixa</MenuItem>
								<MenuItem value="medium">Média</MenuItem>
								<MenuItem value="high">Alta</MenuItem>
							</Select>
						</FormControl>
						<TextField
							label="Tempo Estimado (minutos)"
							type="number"
							fullWidth
							value={formData.estimatedTime}
							onChange={(e) =>
								setFormData({
									...formData,
									estimatedTime: parseInt(e.target.value) || 0,
								})
							}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button onClick={handleSubmit} variant="contained">
						Criar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
