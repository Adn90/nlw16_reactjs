import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

interface ActivitiesProps {
  isNewActivity: boolean;
}

export function Activities({
  isNewActivity
}: ActivitiesProps) {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then(res => setActivities(res.data.activities));
  }, [tripId]);

  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then(res => setActivities(res.data.activities));
  }, [isNewActivity == true]);
  

  return (
    <div className="flex flex-col gap-8">
      {activities.map(category => {
        return (
          <div key={category.date} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">Dia {format(category.date, 'd')}</span>
            <span className="text-xs text-zinc-500">{format(category.date, 'EEEE', { locale: ptBR })}</span>
          </div>
          {category.activities.length > 0 ? (
            <div className="space-y-2.5">
              {category.activities.map(activity => {
                return (
                  <div key={activity.id} className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="size-5 text-lime-300"/>
                    <span className="text-zinc-100">{activity.title}</span>
                    <span className="text-sm text-zinc-400 ml-auto">
                      {format(activity.occurs_at, 'HH:mm')}h
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-xs text-zinc-500">Nenhuma atividade cadastrada nessa data.</p>
          )}
        </div>
        )
      })}
    </div> 
  );
}