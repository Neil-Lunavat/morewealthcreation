"use client";

import { X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

interface DisclaimerDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const DisclaimerDialog = ({ isOpen, onClose }: DisclaimerDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto bg-neutral-900 border border-neutral-800 p-6">
                <DialogHeader className="flex items-center justify-between">
                    <DialogTitle className="text-xl font-semibold text-white">
                        Financial Disclaimer
                    </DialogTitle>
                    <DialogClose
                        className="text-neutral-400 hover:text-orange-500 transition-colors p-1 rounded-full hover:bg-neutral-800"
                        aria-label="Close dialog"
                    >
                        <X size={20} />
                    </DialogClose>
                </DialogHeader>

                <div className="space-y-4 text-neutral-300 text-sm">
                    <p>
                        <strong>Educational Purpose Only:</strong> The content
                        provided on More Wealth Creation is for informational
                        and educational purposes only. It should not be
                        considered as financial, investment, legal, or tax
                        advice.
                    </p>

                    <p>
                        <strong>Not a Financial Service:</strong> More Wealth
                        Creation is not regulated by the Central Bank of Ireland
                        or any other financial regulatory authority. We do not
                        provide regulated financial services or advice as
                        defined under the relevant Irish financial services
                        legislation.
                    </p>

                    <p>
                        <strong>No Client Relationship:</strong> No client,
                        fiduciary or professional relationship is created
                        between you and More Wealth Creation or any of its
                        representatives.
                    </p>

                    <p>
                        <strong>Individual Circumstances:</strong> Financial
                        decisions should be made based on your individual
                        circumstances after consulting with qualified
                        professionals. What may be appropriate for one
                        individual may not be suitable for another.
                    </p>

                    <p>
                        <strong>Investment Risks:</strong> All investments
                        involve risk, including the potential loss of principal.
                        Past performance is not indicative of future results.
                        The value of investments can go down as well as up, and
                        investors may not get back the amount invested.
                    </p>

                    <p>
                        <strong>External Content:</strong> References to
                        specific securities, asset classes, or markets are for
                        illustrative purposes only and do not constitute
                        recommendations or solicitations.
                    </p>

                    <p>
                        <strong>Tax Considerations:</strong> Tax laws are
                        complex and subject to change. The information provided
                        does not constitute tax advice. Please consult with a
                        qualified tax professional for advice specific to your
                        situation.
                    </p>

                    <p>
                        <strong>Seek Professional Advice:</strong> Before making
                        any financial decisions, we strongly recommend
                        consulting with appropriately qualified and regulated
                        financial, legal, and tax advisors.
                    </p>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors"
                        onClick={onClose}
                    >
                        I Understand
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DisclaimerDialog;
