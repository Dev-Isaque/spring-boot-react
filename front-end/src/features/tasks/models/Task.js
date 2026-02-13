export function mapTaskFromApi(data) {
    return {
        id: data.id,
        title: data.title,
        status: data.status,
        priority: data.priority,
        dueDateTime: data.dueDateTime,
        estimatedTime: data.estimatedTime,
        projectId: data.projectId,
        createdAt: data.createdAt,
        labels: data.labels ?? [],
    };
}