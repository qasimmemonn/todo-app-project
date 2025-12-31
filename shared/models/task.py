from dataclasses import dataclass

@dataclass(frozen=True)
class Task:
    """
    Represents a single item to be done.

    Attributes:
        id (int): Unique identifier, auto-incrementing.
        title (str): Short name, required (non-empty).
        description (str): Detailed text, optional.
        completed (bool): Completion status, default False.
    """
    id: int
    title: str
    description: str = ""
    completed: bool = False

    def __post_init__(self):
        if not self.title or not self.title.strip():
            raise ValueError("Title is required and cannot be empty.")
