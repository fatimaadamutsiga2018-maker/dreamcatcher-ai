"use client";

import { useSession } from "next-auth/react";

type PaymentWallProps = {
  isOpen: boolean;
  onClose: () => void;
  action?: 'personal_timing' | 'detailed_insight';
  onRetry?: () => void;
};

export default function PaymentWall({ isOpen, onClose, action, onRetry }: PaymentWallProps) {
  const { data: session } = useSession();

  if (!isOpen) return null;

  const actionDetails = {
    personal_timing: {
      name: 'Personal Timing Guide',
      cost: 5,
      description: 'Get your personalized daily guidance',
    },
    detailed_insight: {
      name: 'Detailed Insight',
      cost: 7,
      description: 'Unlock detailed insights for all dimensions',
    },
  };

  const details = action ? actionDetails[action] : actionDetails.personal_timing;

  const handleCheckin = () => {
    window.location.href = '#energy-modal';
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-gray-900/95 backdrop-blur-md border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="p-6 text-center border-b border-white/10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
            <span className="text-3xl">⚡</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Your energy is low today
          </h3>
          <p className="text-sm text-white/60">
            {details.name} requires {details.cost} Energy
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {!session ? (
            // 未登录 - 显示注册引导
            <div className="text-center space-y-4">
              <p className="text-sm text-white/70 leading-relaxed">
                This part is personal.
                <br />
                Create a free account to see how today works for you.
              </p>
              <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
                <p className="text-xs text-violet-300 mb-2">🎁 Welcome Gift</p>
                <p className="text-sm text-white/80">
                  Get <strong className="text-white">20 Energy</strong> when you sign up
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  // 触发注册弹窗（通过全局事件或其他方式）
                  window.dispatchEvent(new CustomEvent('open-auth-modal'));
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold hover:from-violet-500 hover:to-blue-500 transition-all"
              >
                Create Free Account
              </button>
            </div>
          ) : (
            // 已登录 - 显示获取 Energy 的方式
            <>
              <div className="text-center space-y-3">
                <p className="text-sm text-white/70 leading-relaxed">
                  Come back tomorrow to recharge,
                  <br />
                  or share to earn more.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckin}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-violet-400">📅</span>
                    <span className="text-sm text-white">Check in tomorrow</span>
                  </div>
                  <span className="text-xs text-violet-300">+5 Energy</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    // TODO: 实现分享功能
                    alert('Share feature coming soon!');
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">📤</span>
                    <span className="text-sm text-white">Share & Recharge</span>
                  </div>
                  <span className="text-xs text-blue-300">+5 Energy</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    // 打开 Energy 充值弹窗
                    window.dispatchEvent(new CustomEvent('open-energy-modal'));
                  }}
                  className="w-full p-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/30 hover:border-amber-500/50 transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">⚡</span>
                    <span className="text-sm font-semibold text-amber-300">Boost Energy</span>
                  </div>
                </button>
              </div>

              {/* 首日用尽提示 */}
              {action === 'personal_timing' && (
                <div className="mt-4 p-3 rounded-lg bg-violet-500/10 border border-violet-500/20 text-center">
                  <p className="text-xs text-violet-200 leading-relaxed">
                    Your alignment is complete for today.
                    <br />
                    See you tomorrow at sunrise to reset your flow.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-2 text-sm text-white/50 hover:text-white/70 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
