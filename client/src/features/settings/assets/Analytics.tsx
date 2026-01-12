import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Clock, Ban, BarChart3 } from "lucide-react";

const Analytics = ({ workspaceId }: { workspaceId: string }) => {
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    suspended: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `https://soteria-back.vercel.app/api/v1/invitation/invitations/${workspaceId}`,
        );

        setStats(res.data);
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    };

    if (workspaceId) fetchStats();
  }, [workspaceId]);

  if (loading)
    return <div className="p-8 text-center">Loading Analytics...</div>;

  const cards = [
    {
      label: "Total Invites",
      value: stats.total,
      icon: <BarChart3 className="text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      label: "Accepted",
      value: stats.accepted,
      icon: <Users className="text-green-500" />,
      color: "bg-green-50",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: <Clock className="text-yellow-500" />,
      color: "bg-yellow-50",
    },
    {
      label: "Suspended",
      value: stats.suspended,
      icon: <Ban className="text-red-500" />,
      color: "bg-red-50",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Team Growth Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} p-4 rounded-lg flex items-center justify-between`}
          >
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                {card.label}
              </p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className="p-3 bg-white rounded-full shadow-sm">
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
