import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const {
      email,
      beforeFatigue,
      afterFatigue,
      beforeFocus,
      afterFocus,
      willingToPay,
      willingToInterview,
      comments,
    } = data;

    // Validate required fields
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!beforeFatigue || !afterFatigue || !beforeFocus || !afterFocus) {
      return NextResponse.json(
        { error: 'Please fill in all rating fields' },
        { status: 400 }
      );
    }

    if (!willingToPay) {
      return NextResponse.json(
        { error: 'Please select whether you are willing to pay' },
        { status: 400 }
      );
    }

    // TODO: Save feedback to database (Airtable or other)
    // TODO: If willingToInterview is true, send Calendly scheduling link

    const feedbackData = {
      email,
      beforeFatigue: parseInt(beforeFatigue),
      afterFatigue: parseInt(afterFatigue),
      beforeFocus: parseInt(beforeFocus),
      afterFocus: parseInt(afterFocus),
      fatigueImprovement: parseInt(afterFatigue) - parseInt(beforeFatigue),
      focusImprovement: parseInt(afterFocus) - parseInt(beforeFocus),
      willingToPay,
      willingToInterview: Boolean(willingToInterview),
      comments: comments || '',
      submittedAt: new Date().toISOString(),
    };

    // Temporary: log only
    console.log('Feedback received:', feedbackData);

    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Feedback submitted successfully',
        data: feedbackData 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { error: 'Server error, please try again later' },
      { status: 500 }
    );
  }
}

