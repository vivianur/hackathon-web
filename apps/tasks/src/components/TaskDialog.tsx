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
import { useState, useEffect } from "react";
import { useTaskStore } from "@mindease/shared";
import type { Task, TaskPriority, TaskStatus } from "@mindease/shared";

interface TaskDialogProps {
	editTask?: Task | null;
	onClose?: () => void;
}

export default function TaskDialog({ editTask, onClose }: TaskDialogProps) {
	const [open, setOpen] = useState(false);
	const { addTask, updateTask } = useTaskStore();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "todo" as TaskStatus,
		priority: "medium" as TaskPriority,
		estimatedTime: 25,
		startDate: undefined as Date | undefined,
		dueDate: undefined as Date | undefined,
		tags: [] as string[],
	});

	useEffect(() => {
		if (editTask) {
			setFormData({
				title: editTask.title,
				description: editTask.description,
				status: editTask.status,
				priority: editTask.priority,
				estimatedTime: editTask.estimatedTime || 25,
				startDate: editTask.startDate
					? new Date(editTask.startDate)
					: undefined,
				dueDate: editTask.dueDate ? new Date(editTask.dueDate) : undefined,
				tags: editTask.tags,
			});
			setOpen(true);
		}
	}, [editTask]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setFormData({
			title: "",
			description: "",
			status: "todo",
			priority: "medium",
			estimatedTime: 25,
			startDate: undefined,
			dueDate: undefined,
			tags: [],
		});
		if (onClose) onClose();
	};

	const handleSubmit = () => {
		if (!formData.title.trim()) return;

		if (editTask) {
			updateTask(editTask.id, formData);
		} else {
			addTask({
				...formData,
				tags: formData.tags,
			});
		}
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
				<DialogTitle>
					{editTask ? "Editar Tarefa" : "Criar Nova Tarefa"}
				</DialogTitle>
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
						<TextField
							label="Data Prevista de Início"
							type="date"
							fullWidth
							value={
								formData.startDate
									? formData.startDate.toISOString().split("T")[0]
									: ""
							}
							onChange={(e) =>
								setFormData({
									...formData,
									startDate: e.target.value
										? new Date(e.target.value)
										: undefined,
								})
							}
							InputLabelProps={{ shrink: true }}
						/>
						<TextField
							label="Data Prevista de Término"
							type="date"
							fullWidth
							value={
								formData.dueDate
									? formData.dueDate.toISOString().split("T")[0]
									: ""
							}
							onChange={(e) =>
								setFormData({
									...formData,
									dueDate: e.target.value
										? new Date(e.target.value)
										: undefined,
								})
							}
							InputLabelProps={{ shrink: true }}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button onClick={handleSubmit} variant="contained">
						{editTask ? "Salvar" : "Criar"}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
